<?php

/**
 * Service Layer (Business layer)
 * Couche supplémentaire qui mutualise le code redondant
 */

namespace App\Service;

use App\Controller\DefaultController;
use App\Entity\User;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Exception\ValidatorErrorException;
use App\Service\Tools\ValidatorService;
use App\Service\Tools\PasswordService;

class UserService extends DefaultController
{
    private $validator;
    private $entityManager;

    public function __construct(ValidatorService $validator, EntityManagerInterface $entityManager, PasswordService $password)
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->password = $password;
    }

    /**
     * @param User $user, $patchData
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If user edited
     */
    public function editUser(User $user, $patchData)
    {
        // Firstname
        $firstname = $patchData->getFirstname();
        if ($firstname) {
            $user->setFirstname($firstname);
        }

        // Password
        $password = $patchData->getPassword();
        if ($password) {
            $user->setPassword($password);
        }
        // Email
        $email = $patchData->getEmail();
        if ($email) {
            $user->setEmail($email);
        }

        // On valide les champs
        $this->validator->validate($user);

        // Si le password a passé les erreurs on l'encode avant de le save
        if ($password) {
            $user->setPassword($this->password->encode($password));
        }

        $this->save($user);

        return true;
    }

    /**
     * @param User $user
     * 
     * @return true If password is good
     */
    public function verifyPassword(User $user, $deserializeDatas)
    {
        $verifyPassword = $this->password->verify($user->getPassword(),$deserializeDatas);

        if ($verifyPassword) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param User $user
     */
    public function save(User $user)
    {
        // On sauvegarde l'entité
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
