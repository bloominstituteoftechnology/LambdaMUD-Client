//
//  CredentialsViewController.swift
//  MUD-Project
//
//  Created by Andrew Dhan on 12/10/18.
//  Copyright © 2018 Andrew Dhan. All rights reserved.
//
//  Description: CredentialsViewController handles getting a token
//  from the server with either a login or registration request

import UIKit

class CredentialsViewController: UIViewController, UITextFieldDelegate {
    // Sets the password fields to secure text entry on load
    override func viewDidLoad() {
        passwordTextField.isSecureTextEntry = true
        rePasswordTextField.isSecureTextEntry = true
        usernameTextField.delegate = self
        passwordTextField.delegate = self
        rePasswordTextField.delegate = self
        
    }
    
    // Calls updateViews() before view appears
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        updateViews()
        
    }
    //MARK: - IBActions
    
    // Verify that the username and password are valid and makes an API call depending
    // on the boolen passed by the previous view controller
    @IBAction func connect(_ sender: Any?) {
        guard let username = usernameTextField.text,
            !username.isEmpty else {
                presentInvalidLoginNotification(issue: "username")
                return
        }
        guard let password = getPassword() else {
            presentInvalidLoginNotification(issue: "password")
            return
        }
        
        getAuthToken(username: username, password: password, isNewPlayer: isNewPlayer) { (token, error) in
            DispatchQueue.main.async {
                if let error = error {
                    
                    let alert = UIAlertController(title: "Connection failed", message: "Please check your credentials", preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                    NSLog("Error: \(error)")
                    return
                }
                self.authToken = token
                self.performSegue(withIdentifier: "ConnectSuccessful", sender: nil)
            }
        }
        
    }
    //MARK: - UITextFieldDelegateMethods
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if textField == usernameTextField {
            textField.resignFirstResponder()
            passwordTextField.becomeFirstResponder()
        } else if textField == passwordTextField{
            if isNewPlayer{
                textField.resignFirstResponder()
                rePasswordTextField.becomeFirstResponder()
            } else {
                connect(nil)
            }
        } else if textField == rePasswordTextField{
            connect(nil)
        }
        return false
    }
    //MARK: - Navigation
    
    //On segue, passes the retrieved authentication token to the destination VC
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destinationVC = segue.destination as! GameViewController
        destinationVC.authToken = self.authToken!
    }
    
    //MARK: - Private
    //TODO: Handle possible sign in errors and display appropriately.
    // Makes an API call to server to retrieve authentication token for user
    // Parameters: username - user inputted string that is not empty representing username
    //             password - user inputted string that is not empty and valid, i.e. equal to retyped password when entered
    //             completion - closure to pass string or error message from API call
    //  Return: Void
    private func getAuthToken(username:String, password: String, isNewPlayer: Bool,
                              completion:@escaping (String?, Error?) -> Void){
        let baseURL = URL(string: "https://dhan-mud.herokuapp.com/api/")!
        
        let option = isNewPlayer ? "registration/" : "login/"
        let url = baseURL.appendingPathComponent(option)
        var request = URLRequest(url: url)
        request.setValue("Application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        
        let credentials = isNewPlayer
            ? ["username":username, "password1":password, "password2": password]
            : ["username":username, "password":password]
        
        do{
            let body = try JSONEncoder().encode(credentials)
            request.httpBody = body
        } catch {
            completion(nil,error)
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                completion(nil,error)
                return
            }
            var dictionary = [String:String]()
            do{
                dictionary = try JSONDecoder().decode([String:String].self, from: data!)
                let token = dictionary["key"]
                completion(token,nil)
            } catch{
                completion(nil,error)
            }
            
            
            }.resume()
        
    }
    
    // Handles getting password from the textField differently depending on login or registration
    // Parameter: None
    // Return: String if there is password. Nil if not.
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
    
    // Validates password if user is registering by checking that both password fields are equal
    // Parameter: None
    // Return: String from textField if equal, Nil if not.
    private func validatePassword() -> String?{
        guard let password1 = passwordTextField.text,
            let password2 = rePasswordTextField.text else {return nil}
        return password1 == password2 ? password1 : nil
    }
    
    // Presents alert view controller when login or registration fails
    // Parameter: issue - whether it's password or username that is invalid
    // Return: Void
    private func presentInvalidLoginNotification(issue:String){
        let alert = UIAlertController(title: "Connect failed", message: "Check the \(issue) and try again", preferredStyle: .alert )
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }
    
    // Hides the "Retype Password" textfield when user is logging in
    // Parameter: None
    // Return: String if there is password. Nil if not.
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
    private var authToken: String?
    
}
