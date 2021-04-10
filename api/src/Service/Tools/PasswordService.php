<?php

/**
 * Tools
 * Encode Password
 */

namespace App\Service\Tools;

class PasswordService
{
    public function encode($password)
    {
        $password_encode = password_hash($password, PASSWORD_DEFAULT);

        return $password_encode;
    }

    public function verify($deserializePassword,$passwordhash)
    {
        if (password_verify($deserializePassword, $passwordhash)) {
            return true;
        } else {
            return false;
        }
    }
}
