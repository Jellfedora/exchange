<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
// Serializer
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use App\Entity\User;


// Controller for personnal methods
class DefaultController extends AbstractController
{
    // public function index()
    // {
    //     return $this->render('base.html.twig');
    // }


    /**
     * Serialize array to json.
     *
     * @return json
     * 
     */
    public function serializeJson($data)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $serialize_data = $serializer->serialize($data, 'json');

        return $serialize_data;
    }

    /**
     * Serialize array to json.
     *
     * @return json
     * 
     */
    public function deserializeJson($serialize_data)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $unserialize_data = $serializer->deserialize($serialize_data, User::class, 'json');

        return $unserialize_data;
    }
}
