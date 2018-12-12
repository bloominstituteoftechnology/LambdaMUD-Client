//
//  WelcomeViewController.swift
//  MUD-Project
//
//  Created by Andrew Dhan on 12/10/18.
//  Copyright © 2018 Andrew Liao. All rights reserved.
//

import UIKit

class WelcomeViewController: UIViewController {

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destinationVC = segue.destination as! CredentialsViewController
        if segue.identifier == "CreateAccount" {
            destinationVC.isNewPlayer = true
        }
    }
}
