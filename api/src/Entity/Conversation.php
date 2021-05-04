<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\Message;
use App\Repository\ConversationRepository;

/**
 * @ORM\Entity(repositoryClass=ConversationRepository::class)
 */
class Conversation
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

     /**
     * @ORM\Column(type="integer")
     */
    private $userOne;

    /**
     * @ORM\Column(type="integer")
     */
    private $userTwo;

    /**
     * @ORM\Column(type="datetime")
     *
     * @var \DateTimeInterface|null
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity="Message", mappedBy="conversation")
     */
    private $messages;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->messages = new ArrayCollection();
    }

    public function getCreateddAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreateddAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsers(): ?Array
    {
        return [ $this->userOne, $this->userTwo ]; 
    }

    public function setUserOne(int $userOne): self
    {
        $this->userOne = $userOne;
        return $this;
    }


    public function setUserTwo(int $userTwo): self
    {
        $this->userTwo = $userTwo;
        return $this;
    }

    // public function getMessage(): Message
    // {
    //     return $this->messages;
        
    // }
    public function getUserOne(): ?int
    {
        return $this->userOne; 
    }

    public function getUserTwo(): ?int
    {
        return $this->userTwo; 
    }
}
