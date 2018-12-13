//
//  WelcomeViewController.swift
//  MUD-Project
//
//  Created by Andrew Dhan on 12/10/18.
//  Copyright © 2018 Andrew Dhan. All rights reserved.
//
//  Description: The WelcomeViewController contains the initial view controller where the user can choose to either login or register an account.

import UIKit

class WelcomeViewController: UIViewController {
    
    // Passes a boolean to the next ViewController. This determines where a login or registration
    // API call is made to the server
    // Arguments: standard for prepare()
    // Return: void
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destinationVC = segue.destination as! CredentialsViewController
        if segue.identifier == "CreateAccount" {
            destinationVC.isNewPlayer = true
        }
    }
}
