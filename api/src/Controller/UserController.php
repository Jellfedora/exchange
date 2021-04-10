<?php 

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use App\Service\Exception\ValidatorErrorException;
use App\Controller\DefaultController;
use App\Entity\User;
use App\Service\UserService;

class UserController extends DefaultController
{
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
                            'firstname' => $searchUser->getFirstname()
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
}