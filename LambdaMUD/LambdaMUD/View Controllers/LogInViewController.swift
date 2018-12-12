//
//  LogInViewController.swift
//  LambdaMUD
//
//  Created by Jonathan T. Miles on 12/11/18.
//  Copyright © 2018 Jonathan T. Miles. All rights reserved.
//

import UIKit

class LogInViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    @IBAction func login(_ sender: Any) {
        guard let username = usernameTextField.text,
            let password = passwordTextField.text else { return }
        NetworkController.shared.login(username: username, password: password)
    }
    
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
}
