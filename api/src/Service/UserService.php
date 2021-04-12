<?php

/**
 * Service Layer (Business layer)
 * Couche supplémentaire qui mutualise le code redondant
 */

namespace App\Service;

use App\Controller\DefaultController;
use App\Entity\User;
use App\Entity\Avatar;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Exception\ValidatorErrorException;
use App\Service\Tools\ValidatorService;
use App\Service\Tools\PasswordService;

class UserService extends DefaultController
{
    private $validator;
    private $entityManager;
    private $photoDir;
    private $imageOptimizer;

    public function __construct(ValidatorService $validator, EntityManagerInterface $entityManager, PasswordService $password, string $photoDir)
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->password = $password;
        $this->photoDir = $photoDir;
    }

    /**
     * @param User $user
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If user saved
     */
    public function addUser(User $user)
    {
        // Firstname
        $firstname = $user->getFirstname();
        if ($firstname) {
            $user->setFirstname($firstname);
        }

        // Password
        $password = $user->getPassword();
        if ($password) {
            $user->setPassword($password);
        }
        // Email
        $email = $user->getEmail();
        if ($email) {
            $user->setEmail($email);
        }

        // Avatar
        // $user->setAvatarId($avatar);

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
        $verifyPassword = $this->password->verify($user->getPassword(), $deserializeDatas);

        if ($verifyPassword) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param Avatar $avatar, $uploadedFile
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If user avatar edited
     */
    public function editUserAvatar(Avatar $avatar, $uploadedFile)
    {
        // ImageName
        $imageName = $avatar->getId() . rand(0, 100) . "." . $uploadedFile->getClientOriginalExtension();

        if ($imageName) {
            $avatar->setImageName($imageName);
            // On sauvegarde l'image
            $uploadedFile->move($this->photoDir, $imageName);
        }

        // On valide les champs
        $this->validator->validate($avatar);
        $this->entityManager->persist($avatar);
        $this->entityManager->flush();

        return true;
    }

    /**
     * @param User $user, Avatar $avatar
     * @return true If user removed
     */
    public function deleteuser(User $user, Avatar $avatar)
    {
        // On supprime l'avatar
        $this->entityManager->remove($avatar);
        // On supprime l'user
        $this->entityManager->remove($user);

        $this->entityManager->flush();
        return true;
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
