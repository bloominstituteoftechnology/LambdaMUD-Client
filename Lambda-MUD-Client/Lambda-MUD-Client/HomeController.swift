//
//  HomeController.swift
//  Lambda-MUD-Client
//
//  Created by David Doswell on 12/10/18.
//  Copyright © 2018 David Doswell. All rights reserved.
//

import UIKit

private let navigationTitle = "Foyer"

class HomeController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViews()
        setUpLeftNavBar()
        setUpRightNavBar()
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
    
    let playerOneNameLabel: UILabel = {
        let label = UILabel()
        label.text = "david-override"
        label.textColor = .black
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 25.0, weight: UIFont.Weight(rawValue: -0.3))
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let destinyLabel: UILabel = {
        let label = UILabel()
        label.text = "choose your destiny"
        label.textColor = .black
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 25.0, weight: UIFont.Weight(rawValue: -0.3))
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let northButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("North", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: 1.0))
        button.layer.borderWidth = 1.0
        button.layer.borderColor = UIColor.white.cgColor
        button.layer.cornerRadius = 10.0
        button.clipsToBounds = true
        button.backgroundColor = .black
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    let westButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("West", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: 1.0))
        button.layer.borderWidth = 1.0
        button.layer.borderColor = UIColor.white.cgColor
        button.layer.cornerRadius = 10.0
        button.clipsToBounds = true
        button.backgroundColor = .black
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    let eastButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("East", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: 1.0))
        button.layer.borderWidth = 1.0
        button.layer.borderColor = UIColor.white.cgColor
        button.layer.cornerRadius = 10.0
        button.clipsToBounds = true
        button.backgroundColor = .black
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    let southButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("South", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 17.0, weight: UIFont.Weight(rawValue: 1.0))
        button.layer.borderWidth = 1.0
        button.layer.borderColor = UIColor.white.cgColor
        button.layer.cornerRadius = 10.0
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
    
    private func setUpLeftNavBar() {
        let left = UIButton(type: .custom)
        left.setTitle("", for: .normal)
        left.setTitleColor(.white, for: .normal)
        left.titleLabel?.font = UIFont.boldSystemFont(ofSize: 30)
        left.widthAnchor.constraint(equalToConstant: 60.0).isActive = true
        left.heightAnchor.constraint(equalToConstant: 60.0).isActive = true
        left.adjustsImageWhenHighlighted = false
        left.addTarget(self, action: #selector(leftBarButtonTapped(sender:)), for: .touchUpInside)
        
        navigationItem.leftBarButtonItem = UIBarButtonItem(customView: left)
    }
    
    @objc private func leftBarButtonTapped(sender: UIButton) {
        // do nothing - user must log out to return to login
    }
    
    private func setUpRightNavBar() {
        let right = UIButton(type: .custom)
        right.setTitle("\(playerOneNameLabel.text!)", for: .normal)
        right.setTitleColor(.white, for: .normal)
        right.titleLabel?.textAlignment = .center
        right.titleLabel?.font = UIFont.systemFont(ofSize: 18.0, weight: UIFont.Weight(rawValue: -0.3))
        right.widthAnchor.constraint(equalToConstant: view.frame.size.width).isActive = true
        right.heightAnchor.constraint(equalToConstant: 17.0).isActive = true
        right.adjustsImageWhenHighlighted = false
        right.addTarget(self, action: #selector(rightBarButtonTapped(sender:)), for: .touchUpInside)
        
        navigationItem.rightBarButtonItem = UIBarButtonItem(customView: right)
    }
    
    @objc private func rightBarButtonTapped(sender: UIButton) {
        // do nothing - button's title label is sufficient
    }
    
    private func setUpViews() {
        self.title = navigationTitle
        
        navigationController?.navigationBar.isHidden = false
        navigationController?.navigationBar.backgroundColor = .black
        navigationController?.navigationItem.hidesBackButton = true
        
        view.backgroundColor = .white
        
        view.addSubview(playerOneNameLabel)
        
        view.addSubview(destinyLabel)
        view.addSubview(northButton)
        view.addSubview(westButton)
        view.addSubview(eastButton)
        view.addSubview(southButton)
        
        view.addSubview(playerOneLabel)
        view.addSubview(playerTwoLabel)
        
        destinyLabel.topAnchor.constraint(equalTo: view.topAnchor, constant: 175.0).isActive = true
        destinyLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        destinyLabel.widthAnchor.constraint(equalToConstant: view.frame.size.width).isActive = true
        destinyLabel.heightAnchor.constraint(equalToConstant: 27.0)
        
        northButton.topAnchor.constraint(equalTo: destinyLabel.bottomAnchor, constant: 30.0).isActive = true
        northButton.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        northButton.widthAnchor.constraint(equalToConstant: 125.0).isActive = true
        northButton.heightAnchor.constraint(equalToConstant: 50.0).isActive = true
        
        eastButton.topAnchor.constraint(equalTo: northButton.bottomAnchor, constant: 30.0).isActive = true
        eastButton.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -30.0).isActive = true
        eastButton.widthAnchor.constraint(equalToConstant: 125.0).isActive = true
        eastButton.heightAnchor.constraint(equalToConstant: 50.0).isActive = true
        
        westButton.topAnchor.constraint(equalTo: northButton.bottomAnchor, constant: 30.0).isActive = true
        westButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 30.0).isActive = true
        westButton.widthAnchor.constraint(equalToConstant: 125.0).isActive = true
        westButton.heightAnchor.constraint(equalToConstant: 50.0).isActive = true
        
        southButton.topAnchor.constraint(equalTo: westButton.bottomAnchor, constant: 30.0).isActive = true
        southButton.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        southButton.widthAnchor.constraint(equalToConstant: 125.0).isActive = true
        southButton.heightAnchor.constraint(equalToConstant: 50.0).isActive = true
        
        playerOneLabel.topAnchor.constraint(equalTo: southButton.bottomAnchor, constant: 20.0).isActive = true
        playerOneLabel.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 30.0).isActive = true
        playerOneLabel.widthAnchor.constraint(equalToConstant: 300.0).isActive = true
        playerOneLabel.heightAnchor.constraint(equalToConstant: 38.0).isActive = true
        
        playerTwoLabel.topAnchor.constraint(equalTo: playerOneLabel.bottomAnchor, constant: 30.0).isActive = true
        playerTwoLabel.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 30.0).isActive = true
        playerTwoLabel.widthAnchor.constraint(equalToConstant: 300.0).isActive = true
        playerTwoLabel.heightAnchor.constraint(equalToConstant: 38.0).isActive = true
    }

}
