<?php

namespace App\Repository;

use App\Entity\Conversation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;


class ConversationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Conversation::class);
        $this->entityManager = $entityManager;
    }

    // /**
    //  * @return Conversation[] 
    //  */
    public function findConversation($userOne, $userTwo)
    {
        $connection = $this->entityManager->getConnection();
        // On prepare la requete
        $sql = 
            "SELECT * FROM `conversation`
             WHERE `user_one` IN ($userOne,$userTwo)
             AND `user_two` IN ($userOne,$userTwo)
            ";

        // On éxécute la requete
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        // On récupére le résultat
        $searchConversation = $stmt->fetchAll();


        return $searchConversation;
    }

    // /**
    //  * @return Messages[] 
    //  */
    public function findMessages($conversationId)
    {
        $connection = $this->entityManager->getConnection();
        // On prepare la requete
        $sql = 
            "SELECT * FROM `message`
             WHERE `conversation_id` = $conversationId
             ORDER BY `created_at` ASC
            ";

        // On éxécute la requete
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        // On récupére le résultat
        $searchMessages = $stmt->fetchAll();


        return $searchMessages;
    }
}
