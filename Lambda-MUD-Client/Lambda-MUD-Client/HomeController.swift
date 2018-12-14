//
//  HomeController.swift
//  Lambda-MUD-Client
//
//  Created by David Doswell on 12/10/18.
//  Copyright © 2018 David Doswell. All rights reserved.
//

import UIKit
import PusherSwift

private let navigationTitle = "Foyer"

class HomeController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViews()
        setUpLeftNavBar()
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
    
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
        button.addTarget(self, action: #selector(northButtonTapped(sender:)), for: .touchUpInside)
        return button
    }()
    
    var pusher: Pusher!
    
    @objc private func northButtonTapped(sender: UIButton) {
        let options = PusherClientOptions(host: .cluster("us2"))
        pusher = Pusher(key: PusherKey.string, options: options)
        
        // subscribe to channel and bind to event
        let channel = pusher.subscribe("my-channel")
        
        let _ = channel.bind(eventName: "my-event", callback: { (data: Any?) -> Void in
            if let data = data as? [String : AnyObject] {
                if let message = data["message"] as? String {
                    
                    self.playerOneLabel.text = message
                    
                    print(message)
                }
            }
        })
        pusher.connect()
    }
    
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
    
    @objc private func westButtonTapped(sender: UIButton) {
        
    }
    
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
    
    @objc private func eastButtonTapped(sender: UIButton) {
        
    }
    
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
    
    @objc private func southButtonTapped(sender: UIButton) {
        
    }
    
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
    
    private func setUpViews() {
        self.title = navigationTitle
        
        navigationController?.navigationBar.isHidden = false
        navigationController?.navigationBar.backgroundColor = .black
        navigationController?.navigationItem.hidesBackButton = true
        
        view.backgroundColor = .white
        
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
