<?php 

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use App\Service\Exception\ValidatorErrorException;
use App\Controller\DefaultController;
use App\Entity\User;
use App\Entity\Avatar;
use App\Service\UserService;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class UserController extends DefaultController
{
    /**
     * @Route("/api/user/create", name="create_user", methods="POST")
     */
    public function createUser( Request $request, SerializerInterface $serializer, UserService $userService)
    {
        $postData = $request->getContent();
        $user = $serializer->deserialize($postData, User::class, 'json');

        try {
            // Try to save user
            $userService->addUser($user);
        } catch (ValidatorErrorException $e) {
            $errors = $e->getErrors();
            // If error
            if (count($errors) > 0) {
                $data['data'] = array(
                    'status'  => '422',
                    'message' => 'Un ou des champs ne sont pas valides',
                );
                foreach ($errors as $error) {
                    $data['message_error'][] = $error->getMessage();
                }
                return $this->json($data, 422);
            }
        }
        $data['data'] = array(
            'status'  => '201',
            'message' => 'Utilisateur créé',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'firstname' => $user->getFirstname()
            ]
        );
        return $this->json($data, 201);
    }

    /**
     * Get user if exist and email&&password are corrects.
     * @Route("/api/login", name="login", methods="POST")
     * return search user or error message
     */
    public function login(Request $request,SerializerInterface $serializer,UserService $userService) {

        // Received datas
        $postData = $request->getContent();
        $user = $serializer->deserialize($postData, User::class, 'json');

        //Search User
        $searchUser = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(['email'=>$user->getEmail()]);
        ;

        $verifiedPassword=$userService->verifyPassword($user,$searchUser->getPassword());
        if ($verifiedPassword) {
            $data['data'] = array(
                        'status'  => '201',
                        'message' => 'Informations utilisateurs récupérées',
                        'user' => [
                            'id' => $searchUser->getId(),
                            'email' => $searchUser->getEmail(),
                            'firstname' => $searchUser->getFirstname(),
                            'avatarUrl'=>$searchUser->getAvatarUrl()
                        ]
                    );
                    return $this->json($data, 201); 
        } else {
            $data['data'] = array(
                'status'  => '422',
                'message' => 'Email ou Mot de passe invalide',
            );
            return $this->json($data, 401);
        }
    }

    /**
     * Lists all users.
     * @Route("/api/get_all_users", name="get_all_users", methods="GET")
     * return all users if exists or never
     */
    public function getAllUsers() {
        $users = $this->getDoctrine()
            // TODO utiliser le repository pour enlever le password de la réponse
            ->getRepository(User::class)
            ->findAll();

        if (!$users) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Aucun utilisateur enregistré'
            );
            return $this->json($data, 401);
        } else {
            $data['data'] = array(
                'status'  => '201',
                'message' => 'Informations utilisateurs récupérées',
                'users' => $users
            );
            return $this->json($data, 201);
        }
    }

    /**
     * @Route("/api/user/edit/{id}", name="edit_user", methods="PUT")
     */
    public function editUser($id, Request $request, SerializerInterface $serializer, UserService $userService)
    {
        $patchData = $request->getContent();
        $patchUser = $serializer->deserialize($patchData, User::class, 'json');

        // On récupére l'utilisateur
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        // Si null 
        if (!$user) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas d\'utilisateur connu pour l\'identifiant ' . $id
            );
            return $this->json($data, 404);
        }

        try {
            // Try to edit user
            $userService->editUser($user, $patchUser);
        } catch (ValidatorErrorException $e) {
            $errors = $e->getErrors();
            // If error
            if ($errors == true) {
                $data['data'] = array(
                    'status'  => '422',
                    'message' => 'Un ou des champs ne sont pas valides',
                );
                // $result['errors'] = [];
                foreach ($errors as $error) {
                    $data['message_error'][] = $error->getMessage();
                }
                return $this->json($data, 422);
            }
        }
        $data['data'] = array(
            'status'  => '201',
            'message' => 'Utilisateur modifié',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'firstname' => $user->getFirstname()
            ]
        );
        return $this->json($data, 201);
    }

    /**
     * @Route("/api/user/avatar-edit/{id}", name="edit_user_avatar", methods="POST")
     */
    public function editUserAvatar( $id, Request $request, SerializerInterface $serializer, UserService $userService)
    {
        // On récupére l'utilisateur
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        // Si null 
        if (!$user) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas d\'utilisateur connu pour l\'identifiant ' . $id
            );
            return $this->json($data, 404);
        } 

        // On récupére l'avatar associé
        $avatar = $this->getDoctrine()
        ->getRepository(Avatar::class)
        ->find($user->getAvatar());

        // On récupére l'image
        $uploadedFile = $request->files->get('file');
        $directory = __DIR__.'/../../public/uploads/images/avatars';

        // Si elle existe on supprime l'ancienne image
        if($user->getAvatarImageName()){
            unlink($directory. "/" . $user->getAvatarImageName());
        }
        
        // On update l'avatar
        try {
            // Try to edit user
            $userService->editUserAvatar($avatar, $uploadedFile);
        } catch (ValidatorErrorException $e) {
            $errors = $e->getErrors();
            // If error
            if ($errors == true) {
                $data['data'] = array(
                    'status'  => '422',
                    'message' => 'Un ou des champs ne sont pas valides',
                );
                foreach ($errors as $error) {
                    $data['message_error'][] = $error->getMessage();
                }
                return $this->json($data, 422);
            }
        }

        

        // On sauvegarde l'image
        foreach($request->files as $uploadedFile) {
            $file = $uploadedFile->move($directory, $user->getAvatarImageName());
        }

        $data['data'] = array(
            'status'  => '201',
            'message' => 'Avatar de l\'utilisateur modifié',
            'avatarUrl' => "https://127.0.0.1:8000/uploads/images/avatars/" . $avatar->getImageName()
        );
        return $this->json($data, 201);
        }
}