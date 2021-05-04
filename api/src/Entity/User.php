<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=60)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $firstname;

    /**
     * @ORM\OneToOne(targetEntity="Avatar",cascade={"persist"})
     * @ORM\JoinColumn(name="avatar_id", referencedColumnName="id",nullable=false,)
     */
    private $avatar;

    /**
     * @ORM\ManyToMany(targetEntity="Conversation", inversedBy="users")
     * @ORM\JoinTable(name="users_conversations")
     */
    private $conversations;


    public function __construct()
    {
        $this->avatar = new Avatar();
        $this->conversation = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getAvatar(): ?Avatar
    {
        return $this->avatar;
    }

    public function getAvatarUrl(): ?string
    {
        return "uploads/images/avatars/" . $this->avatar->getImageName();
    }

    public function getAvatarImageName(): ?string
    {
        return $this->avatar->getImageName();
    }

    public function setAvatarId(?Avatar $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    // public function getGroups()
    // {
    //     return $this->groups;
    // }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }
}
