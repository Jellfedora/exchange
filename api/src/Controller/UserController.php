<?php 

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

use App\Controller\DefaultController;
use App\Entity\User;

class UserController extends DefaultController
{
    /**
     * Get user if exist and email&&password are corrects.
     * @Route("/api/login", name="login", methods="POST")
     * return search user or never
     */
    public function login(Request $request,SerializerInterface $serializer) {

        

        // Received datas
        $postData = $request->getContent();
        $user = $serializer->deserialize($postData, User::class, 'json');

        //Search User
        $searchUser = $this->getDoctrine()
            ->getRepository(User::class)
            ->findBy(
                array(
                    'email' => $user->getEmail(),
                    'password' => $user->getPassword()
                )
            );
        ;

        if (!$searchUser) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Email ou mot de passe invalide'
            );
            return $this->json($data, 401);
        } else {
            $data['data'] = array(
                'status'  => '201',
                'message' => 'Informations utilisateurs récupérées',
                'users' => $searchUser
            );
            return $this->json($data, 201); 
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
}