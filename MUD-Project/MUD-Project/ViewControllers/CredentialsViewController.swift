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
            
                    let alert = UIAlertController(title: "Connection failed", message: nil, preferredStyle: .alert)
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
    
    //MARK: - Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destinationVC = segue.destination as! GameViewController
        destinationVC.authToken = self.authToken!
    }
    
    //MARK: - Private
    //TODO: Handle possible sign in errors and display appropriately.
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
            }
            var dictionary = [String:String]()
            do{
                dictionary = try JSONDecoder().decode([String:String].self, from: data!)
                completion(dictionary["key"],nil)
            } catch{
                completion(nil,error)
            }
            
            
            }.resume()
        
    }
    
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
    private func presentInvalidLoginNotification(issue:String){
        let alert = UIAlertController(title: "Connect failed", message: "Check the \(issue) and try again", preferredStyle: .alert )
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        self.present(alert, animated: true, completion: nil)
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
    private var authToken: String?
    
}
