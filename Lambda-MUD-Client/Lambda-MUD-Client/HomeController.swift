//
//  HomeController.swift
//  Lambda-MUD-Client
//
//  Created by David Doswell on 12/10/18.
//  Copyright © 2018 David Doswell. All rights reserved.
//

import UIKit

private let navigationTitle = "Home"

class HomeController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViews()

    }
    
    // TODO
    
    let userNameLabel: UILabel = {
        let label = UILabel()
        label.text = "david"
        label.textColor = .white
        label.textAlignment = .left
        label.font = UIFont.systemFont(ofSize: 18.0)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let northButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("N", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: 1.0))
        button.layer.borderWidth = 1.0
        button.layer.borderColor = UIColor.white.cgColor
        button.layer.cornerRadius = 25.0
        button.clipsToBounds = true
        button.backgroundColor = .black
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    let southButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("S", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: 1.0))
        button.layer.borderWidth = 1.0
        button.layer.borderColor = UIColor.white.cgColor
        button.layer.cornerRadius = 25.0
        button.clipsToBounds = true
        button.backgroundColor = .black
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    let eastButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("E", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: 1.0))
        button.layer.borderWidth = 1.0
        button.layer.borderColor = UIColor.white.cgColor
        button.layer.cornerRadius = 25.0
        button.clipsToBounds = true
        button.backgroundColor = .black
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    let westButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("W", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: 1.0))
        button.layer.borderWidth = 1.0
        button.layer.borderColor = UIColor.white.cgColor
        button.layer.cornerRadius = 25.0
        button.clipsToBounds = true
        button.backgroundColor = .black
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    let playerOneLabel: UILabel = {
        let label = UILabel()
        label.text = "Player One"
        label.textAlignment = .left
        label.textColor = .lightGray
        label.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: -0.3))
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let playerTwoLabel: UILabel = {
        let label = UILabel()
        label.text = "Player Two"
        label.textAlignment = .left
        label.textColor = .lightGray
        label.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: -0.3))
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private func setUpViews() {
        self.title = navigationTitle
        navigationController?.navigationBar.backgroundColor = .black
        
        view.backgroundColor = .black
        
        view.addSubview(userNameLabel)
        
        view.addSubview(northButton)
        view.addSubview(southButton)
        view.addSubview(eastButton)
        view.addSubview(westButton)
        
        view.addSubview(playerOneLabel)
        view.addSubview(playerTwoLabel)
        
        userNameLabel.topAnchor.constraint(equalTo: view.topAnchor, constant: 175.0).isActive = true
        userNameLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        userNameLabel.widthAnchor.constraint(equalToConstant: 300.0).isActive = true
        userNameLabel.heightAnchor.constraint(equalToConstant: 31.0)
        
        northButton.topAnchor.constraint(equalTo: userNameLabel.bottomAnchor, constant: 50.0).isActive = true
        northButton.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        northButton.widthAnchor.constraint(equalToConstant: 50.0).isActive = true
        northButton.heightAnchor.constraint(equalToConstant: 50.0).isActive = true
        
        westButton.topAnchor.constraint(equalTo: northButton.bottomAnchor, constant: 30.0).isActive = true
        westButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 100.0).isActive = true
        westButton.widthAnchor.constraint(equalToConstant: 50.0).isActive = true
        westButton.heightAnchor.constraint(equalToConstant: 50.0).isActive = true
        
        eastButton.topAnchor.constraint(equalTo: northButton.bottomAnchor, constant: 30.0).isActive = true
        eastButton.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -100.0).isActive = true
        eastButton.widthAnchor.constraint(equalToConstant: 50.0).isActive = true
        eastButton.heightAnchor.constraint(equalToConstant: 50.0).isActive = true
        
        southButton.topAnchor.constraint(equalTo: eastButton.bottomAnchor, constant: 30.0).isActive = true
        southButton.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        southButton.widthAnchor.constraint(equalToConstant: 50.0).isActive = true
        southButton.heightAnchor.constraint(equalToConstant: 50.0).isActive = true
        
        playerOneLabel.topAnchor.constraint(equalTo: southButton.bottomAnchor, constant: 20.0).isActive = true
        playerOneLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        playerOneLabel.widthAnchor.constraint(equalToConstant: 300.0).isActive = true
        playerOneLabel.heightAnchor.constraint(equalToConstant: 38.0).isActive = true
        
        playerTwoLabel.topAnchor.constraint(equalTo: playerOneLabel.bottomAnchor, constant: 30.0).isActive = true
        playerTwoLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        playerTwoLabel.widthAnchor.constraint(equalToConstant: 300.0).isActive = true
        playerTwoLabel.heightAnchor.constraint(equalToConstant: 38.0).isActive = true
    }

}
