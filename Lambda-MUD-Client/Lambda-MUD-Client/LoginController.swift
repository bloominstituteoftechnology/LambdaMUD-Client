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
        button.addTarget(self, action: #selector(showHome(sender:)), for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    @objc private func showHome(sender: UIButton) {
        let vc = HomeController()
        self.navigationController?.pushViewController(vc, animated: true)
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
