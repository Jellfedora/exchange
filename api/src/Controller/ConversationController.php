<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use App\Service\Exception\ValidatorErrorException;
use App\Controller\DefaultController;
use App\Entity\User;
use App\Service\ConversationService;
use App\Entity\Conversation;
use App\Entity\Message;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Repository\ConversationRepository;

class ConversationController extends DefaultController
{
    public function __construct(ConversationRepository $conversationRepository)
    {
        $this->conversationRepository = $conversationRepository;
    }

    /**
     * @Route("/api/conversation/create", name="create_conversation", methods="POST")
     */
    public function createConversation(Request $request, SerializerInterface $serializer, ConversationService $conversationService,ConversationRepository $conversationRepository)
    {
        $postData = $request->getContent();
        $conversation = $serializer->deserialize($postData, Conversation::class, 'json');

        $message = $serializer->deserialize($postData, Message::class, 'json');

        // Search conversation id if exist
        $userOne=$conversation->getUsers()[0];
        $userTwo=$conversation->getUsers()[1];
        
        // On cherche si une conversation existe déjà entre ces deux users
        $searchConversation=$this->conversationRepository->findConversation($userOne,$userTwo);
        // Si il y a deja une conversation existante
        if ($searchConversation) {
            // On récupére l'entity conversation
            $conversationEntity = $this->getDoctrine()
            ->getRepository(Conversation::class)
            ->find((int)$searchConversation[0]["id"]);

                try {
                    // Try to save conversation and message
                    $conversationService->addMessage($conversationEntity,$message);
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
        } else {
            try {
                // Try to save conversation and message
                $conversationService->createConversation($conversation,$message);
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
        }
        

        $data['data'] = array(
            'status'  => '201',
            'message' => 'Message ajouté',
            'result' => [
                'conversation' => $conversation,
                'message'=> $message
            ]
        );
        return $this->json($data, 201);
    }

    /**
     * @Route("/api/conversation/get", name="get_conversation", methods="POST")
     */
    public function getMessagesConversation(Request $request, SerializerInterface $serializer, ConversationService $conversationService,ConversationRepository $conversationRepository)
    {
        $postData = $request->getContent();
        $conversation = $serializer->deserialize($postData, Conversation::class, 'json');
        // return $this->json('test', 201);
        // Search conversation id if exist
        $userOne=$conversation->getUserOne();
        $userTwo=$conversation->getUserTwo();
        
        // On cherche si une conversation existe déjà entre ces deux users
        $searchConversation=$this->conversationRepository->findConversation($userOne,$userTwo);
        // Si la conversation existe on récupére tout les messages 
        if ($searchConversation) {
            $searchMessages=$this->conversationRepository->findMessages($searchConversation[0]['id']);
            
            // var_dump($searchMessages);die();

            $data['data'] = array(
                'status'  => '201',
                'message' => 'Conversation récupérée',
                'result' => [
                    'conversation' => $searchMessages
                ]
            );
            return $this->json($data, 201);
        } else {
            $data['data'] = array(
                'status'  => '201',
                'message' => 'Pas de conversation créée'
            );
            return $this->json($data, 201);
        }
        

        
    }
}
