//
//  CredentialsViewController.swift
//  MUD-Project
//
//  Created by Andrew Dhan on 12/10/18.
//  Copyright © 2018 Andrew Liao. All rights reserved.
//

import UIKit

class CredentialsViewController: UIViewController {
    override func viewDidLoad() {
        passwordTextField.isSecureTextEntry = true
        rePasswordTextField.isSecureTextEntry = true
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        updateViews()
    }
    //MARK: - IBActions
    @IBAction func connect(_ sender: Any) {
        guard let username = usernameTextField.text,
            !username.isEmpty else {
                return
        }
        guard let password = getPassword() else {
            return
        }
//        getAuthKey(username, password,isNewPlayer)
        
    }
    
    //MARK: - Private
    private func getPassword() -> String? {
        if isNewPlayer {
            return validatePassword()
        } else {
            guard let password = passwordTextField.text,
                !password.isEmpty else {
                    return nil
            }
            return password
        }
    }
    private func validatePassword() -> String?{
        guard let password1 = passwordTextField.text,
            let password2 = rePasswordTextField.text else {return nil}
        return password1 == password2 ? password1 : nil
    }
    
    private func updateViews(){
        if isNewPlayer {
            rePasswordTextField.isHidden = false
            self.title = "Create Account"
        } else {
            rePasswordTextField.isHidden = true
            self.title = "Login"
        }
    }
    
    //MARK: - Properties
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var rePasswordTextField: UITextField!
    
    var isNewPlayer: Bool = false
    
}
