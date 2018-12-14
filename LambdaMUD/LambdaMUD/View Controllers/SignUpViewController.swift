//
//  SignUpViewController.swift
//  LambdaMUD
//
//  Created by Jonathan T. Miles on 12/11/18.
//  Copyright © 2018 Jonathan T. Miles. All rights reserved.
//

import UIKit

class SignUpViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func signUp(_ sender: Any) {
        guard let username = userNameTextField.text,
            let password1 = passwordTextField.text,
            let password2 = password2TextField.text else { return }
        NetworkController.shared.signup(username: username, password1: password1, password2: password2)
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    // MARK: - Properties

    @IBOutlet weak var userNameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var password2TextField: UITextField!
}
