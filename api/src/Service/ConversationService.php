<?php

/**
 * Service Layer (Business layer)
 * Couche supplémentaire qui mutualise le code redondant
 */

namespace App\Service;

use App\Controller\DefaultController;
use App\Entity\User;
use App\Entity\Conversation;
use App\Repository\ConversationRepository;
use App\Entity\Message;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Exception\ValidatorErrorException;
use App\Service\Tools\ValidatorService;
use App\Service\Tools\PasswordService;
use Symfony\Component\Serializer\SerializerInterface;

class ConversationService extends DefaultController
{
    private $validator;
    private $entityManager;

    public function __construct(ValidatorService $validator, SerializerInterface $serializer, EntityManagerInterface $entityManager,ConversationRepository $conversationRepository)
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->conversationRepository = $conversationRepository;
        $this->serializer = $serializer;
    }

    /**
     * @param Conversation $conversation, Message $message
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If conversation saved
     */
    public function createConversation(Conversation $conversation, Message $message)
    {
        
        // On valide les champs
        $this->validator->validate($conversation);
        $this->saveConversation($conversation);
            
        // On valide les champs
        $this->validator->validate($message);
        $message->setConversation($conversation);
        $this->saveMessage($message);
        
        return true;
    }

    /**
     * @param Conversation $conversation, Message $message
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If conversation saved
     */
    public function addMessage(Conversation $conversation, Message $message)
    {       
        // $message->getUserId();
        // On valide les champs
        $this->validator->validate($message);
        $message->setConversation($conversation);
        $this->saveMessage($message);
        
        return true;
    }

    /**
     * @param Conversation $conversation
     */
    public function saveConversation(Conversation $conversation)
    {
        // On sauvegarde l'entité
        $this->entityManager->persist($conversation);
        $this->entityManager->flush();
    }

    /**
     * @param Message $message
     */
    public function saveMessage(Message $message)
    {
        // On sauvegarde l'entité
        $this->entityManager->persist($message);
        $this->entityManager->flush();
    }
}
