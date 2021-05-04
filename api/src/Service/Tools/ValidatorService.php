<?php

/**
 * Tools
 * Validate errors
 */

namespace App\Service\Tools;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Service\Exception\ValidatorErrorException;

class ValidatorService
{
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }
    public function validate($user)
    {
        $call_validate = 0;
        $call_validate++;
        $errors = $this->validator->validate($user);
        if (count($errors) > 0) {
            // Levons une exception personnalisée
            $e = new ValidatorErrorException();
            $e->setErrors($errors);
            throw $e;
        }
    }
}
