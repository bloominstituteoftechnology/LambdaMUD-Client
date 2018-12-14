//
//  LoginController.swift
//  Lambda-MUD-Client
//
//  Created by David Doswell on 12/10/18.
//  Copyright © 2018 David Doswell. All rights reserved.
//

import UIKit

private let navigationTitle = "Login"

class LoginController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViews()
        
//        if let username = UserDefaults.standard.value(forKey: String.username) as? String {
//            usernameTextField.text = username
//        }
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .default
    }
    
    let nameLabel: UILabel = {
        let label = UILabel()
        label.text = "LAMBDA MUD"
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 40.0, weight: UIFont.Weight(2.0))
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let logoLabel: UILabel = {
        let label = UILabel()
        label.text = "a place for free trade"
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 20.0, weight: UIFont.Weight(-0.3))
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let playerOneImage: UIImageView = {
        let image = UIImageView()
        image.image = UIImage(named: "logo")
        image.contentMode = .scaleAspectFill
        image.translatesAutoresizingMaskIntoConstraints = false
        return image
    }()
    
    let playerTwoImage: UIImageView = {
        let image = UIImageView()
        image.image = UIImage(named: "logo")
        image.contentMode = .scaleAspectFill
        image.translatesAutoresizingMaskIntoConstraints = false
        return image
    }()
    
    let usernameTextField: UITextField = {
        let textField = UITextField()
        textField.textAlignment = .left
        textField.textColor = .black
        textField.tintColor = .black
        textField.font = UIFont.systemFont(ofSize: 25.0, weight: UIFont.Weight(-0.3))
        textField.borderStyle = .none
        textField.autocapitalizationType = .none
        textField.attributedPlaceholder = NSAttributedString(string: "username", attributes: [NSAttributedString.Key.foregroundColor : UIColor.lightGray])
        textField.becomeFirstResponder()
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    }()
    
    let passwordTextField: UITextField = {
        let textField = UITextField()
        textField.textAlignment = .left
        textField.textColor = .black
        textField.tintColor = .black
        textField.font = UIFont.systemFont(ofSize: 25.0, weight: UIFont.Weight(-0.3))
        textField.borderStyle = .none
        textField.autocapitalizationType = .none
        textField.attributedPlaceholder = NSAttributedString(string: "password", attributes: [NSAttributedString.Key.foregroundColor : UIColor.lightGray])
        textField.becomeFirstResponder()
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    }()
    
    let confirmPasswordTextField: UITextField = {
        let textField = UITextField()
        textField.textAlignment = .left
        textField.textColor = .black
        textField.tintColor = .black
        textField.font = UIFont.systemFont(ofSize: 25.0, weight: UIFont.Weight(-0.3))
        textField.borderStyle = .none
        textField.autocapitalizationType = .none
        textField.attributedPlaceholder = NSAttributedString(string: "confirm password", attributes: [NSAttributedString.Key.foregroundColor : UIColor.lightGray])
        textField.becomeFirstResponder()
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    }()
    
    let loginButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Sign up", for: .normal)
        button.setTitleColor(.black, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: 1.0))
        button.layer.borderWidth = 1.0
        button.layer.borderColor = UIColor.black.cgColor
        button.layer.cornerRadius = 25.0
        button.clipsToBounds = true
        button.backgroundColor = .white
        button.addTarget(self, action: #selector(showHomeLogin), for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    @objc private func showHomeLogin(sender: UIButton) {
        if usernameTextField.text!.isEmpty || passwordTextField.text!.isEmpty || confirmPasswordTextField.text!.isEmpty {
            
            showErrorAlert()
        
        } else {
            let url = BaseURL.string.appendingPathComponent("json")
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue("Token: \(Token.string)", forHTTPHeaderField: "Authorization")
            
            let credentials = ["username":usernameTextField.text!, "password":passwordTextField.text!]
            
            do {
                try request.httpBody = JSONEncoder().encode(credentials)
            } catch {
                NSLog("Error posting request: \(error)")
            }
            
            URLSession.shared.dataTask(with: request) { (data, _, error) in
                if let error = error {
                    NSLog("Error requesting data: \(error)")
                }
                var dictionary = [String:String]()
                
                do {
                    dictionary = try JSONDecoder().decode([String:String].self, from: data!)
                    
                } catch {
                    NSLog("Error decoding data: \(error)")
                }
                print(dictionary)
            }.resume()
            
            let vc = HomeController()
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
    private func showErrorAlert() {
        let alert = UIAlertController(title: "Error", message: "Please enter all fields correctly", preferredStyle: .alert)
        let okay = UIAlertAction(title: "Okay", style: .default) { (action) in
        }
        alert.addAction(okay)
        present(alert, animated: true, completion: nil)
    }
    
    private func setUpViews() {
        self.title = navigationTitle
        view.backgroundColor = .white
        
        view.addSubview(nameLabel)
        view.addSubview(logoLabel)
        view.addSubview(playerOneImage)
        view.addSubview(playerTwoImage)
        view.addSubview(usernameTextField)
        view.addSubview(passwordTextField)
        view.addSubview(confirmPasswordTextField)
        view.addSubview(loginButton)
        
        nameLabel.topAnchor.constraint(equalTo: view.topAnchor, constant: 100.0).isActive = true
        nameLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        nameLabel.widthAnchor.constraint(equalToConstant: view.frame.size.width).isActive = true
        nameLabel.heightAnchor.constraint(equalToConstant: 42.0).isActive = true
        
        logoLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 30.0).isActive = true
        logoLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        logoLabel.widthAnchor.constraint(equalToConstant: view.frame.size.width).isActive = true
        logoLabel.heightAnchor.constraint(equalToConstant: 22.0).isActive = true
        
        playerOneImage.topAnchor.constraint(equalTo: logoLabel.bottomAnchor, constant: 30.0).isActive = true
        playerOneImage.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 100.0).isActive = true
        playerOneImage.widthAnchor.constraint(equalToConstant: 100.0).isActive = true
        playerOneImage.heightAnchor.constraint(equalToConstant: 100.0).isActive = true
        
        playerTwoImage.topAnchor.constraint(equalTo: logoLabel.bottomAnchor, constant: 30.0).isActive = true
        playerTwoImage.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -100.0).isActive = true
        playerTwoImage.widthAnchor.constraint(equalToConstant: 100.0).isActive = true
        playerTwoImage.heightAnchor.constraint(equalToConstant: 100.0).isActive = true
        
        usernameTextField.topAnchor.constraint(equalTo: playerOneImage.bottomAnchor, constant: 30.0).isActive = true
        usernameTextField.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 30.0).isActive = true
        usernameTextField.widthAnchor.constraint(equalToConstant: 350.0).isActive = true
        usernameTextField.heightAnchor.constraint(equalToConstant: 27.0).isActive = true
        
        passwordTextField.topAnchor.constraint(equalTo: usernameTextField.bottomAnchor, constant: 30.0).isActive = true
        passwordTextField.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 30.0).isActive = true
        passwordTextField.widthAnchor.constraint(equalToConstant: 350.0).isActive = true
        passwordTextField.heightAnchor.constraint(equalToConstant: 27.0).isActive = true
        
        confirmPasswordTextField.topAnchor.constraint(equalTo: passwordTextField.bottomAnchor, constant: 30.0).isActive = true
        confirmPasswordTextField.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 30.0).isActive = true
        confirmPasswordTextField.widthAnchor.constraint(equalToConstant: 350.0).isActive = true
        confirmPasswordTextField.heightAnchor.constraint(equalToConstant: 27.0).isActive = true
        
        loginButton.topAnchor.constraint(equalTo: confirmPasswordTextField.bottomAnchor, constant: 50.0).isActive = true
        loginButton.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        loginButton.widthAnchor.constraint(equalToConstant: 125.0).isActive = true
        loginButton.heightAnchor.constraint(equalToConstant: 50.0).isActive = true
    }
}

extension String {
    static var username = "username"
}
