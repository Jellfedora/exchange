<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\Persistence\ManagerRegistry;


class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    // /**
    //  * @return User[] 
    //  */
    public function findByFirstname(User $user)
    {
        $firstname = $user->getFirstname();

        return $this->createQueryBuilder('user')
            ->andWhere('user.firstname LIKE :firstname')
            ->setParameter('firstname', '%' . $firstname . '%')
            ->addOrderBy('user.firstname', 'ASC')
            ->getQuery()
            ->execute();
    }
}
