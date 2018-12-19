//
//  GameViewController.swift
//  MUD-Project
//
//  Created by Andrew Dhan on 12/10/18.
//  Copyright © 2018 Andrew Dhan. All rights reserved.
//
//  Description: GameViewController handles the game and is the main view controller of this app

import UIKit
import PusherSwift

private let baseURL = URL(string: "https://dhan-mud.herokuapp.com/api/adv/")!

class GameViewController: UIViewController, UITextFieldDelegate {
    override func viewDidLoad() {
        super.viewDidLoad()
        messageTextField.delegate = self
    }
    // Runs initialize function before VC appears
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        getPlayerState(initializePusher: true)

    }
    
    // MARK: - IBAction
    
    // Sends a move API call when the user presses one of the cardinal direction buttons
    // and updates the view with response or presents an error message
    @IBAction func move(_ sender: UIButton) {
        let direction = directions[sender.tag]
        makeMoveAPI(direction: direction) { (game, error) in
            if let error = error {
                NSLog("Error making move: \(error)")
            }
            if let game = game{
                DispatchQueue.main.async {
                    guard let errorMessage = game.error_msg, !errorMessage.isEmpty else {
                        self.roomActivity = [String]()
                        self.updateViews(game: game)
                        return
                    }
                
                    let alert = UIAlertController(title: "Oops!", message: errorMessage, preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                }
            }
        }
    }
    
    // Makes a say API call and adds the sent message to the roomActivity array only
    // after completion of the API call
    @IBAction func sendMessage(_ sender: Any?) {
        guard let playerName = playerName,
            let message = messageTextField.text,
            !message.isEmpty else {return}
        sendMessageAPI(message: message) {
            self.roomActivity.append("\(playerName): \(message)")
            DispatchQueue.main.async {
                self.messageTextField.resignFirstResponder()
            }
            
        }
    }
    // MARK: - UITextFieldDelegate Methods
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        sendMessage(nil)
        return false
    }
    
    //MARK: - Private Methods
    
    // Sends init API call and updates the VC with response
    // Parameter: None
    // Return: None
    private func getPlayerState(initializePusher:Bool = false){
        initAPI { (game, error) in
            if let error = error {
                NSLog("Error fetching from server: \(error)")
                return
            }
            
            if let game = game {
                if initializePusher{
                    self.initializePusher(playerUUID: game.uuid!)
                }
                self.playerName = game.name
                if self.currentRoom == nil {
                    self.currentRoom = game.title
                }
                DispatchQueue.main.async {
                    self.title = game.name
                    self.updateViews(game: game)
                    
                    if self.currentRoom != game.title{
                        self.roomActivity = [String]()
                        self.currentRoom = game.title
                    }
                }
            }
        }
    }
    
    // Updates the room name, room description and players in the room
    // Parameter: game - decoded response from the init API call
    // Return: None
    private func updateViews(game:Game){
        guard isViewLoaded else {return}
        roomNameTextLabel.text = game.title
        roomDescriptionTextView.text = game.description
        players = game.players
    }
    
    // Update the playersTextView with the conent of the players property
    // Parameter: None
    // Return: None
    private func updatePlayers(){
        if players.isEmpty{
            playerListTextView.text = "No one but your shadow"
        } else {
            DispatchQueue.main.async {
                self.playerListTextView.text = self.players.joined(separator: "\n")
            }
            
        }
    }
    
    // Update the activityTextView with the contents of the roomActivity property
    // Parameter: None
    // Return: None
    private func updateChat(){
        if roomActivity.isEmpty{
            activityTextView.text = "The room is dead silent"
        } else {
            DispatchQueue.main.async {
                self.activityTextView.text = self.roomActivity.joined(separator: "\n")
                self.scrollTextViewToBottom(textView: self.activityTextView)
                self.messageTextField.text = ""
            }
        }
    }
    
    // Automatically scrows roomActivityTextView to the bottom of the view when the lines
    // are more than the height of the view.
    // Parameter: textView - the view that needs to be automatically scrolled
    // Return: None
    private func scrollTextViewToBottom(textView: UITextView) {
        if textView.text.count > 0 {
            let location = textView.text.count - 1
            let bottom = NSMakeRange(location, 1)
            textView.scrollRangeToVisible(bottom)
        }
    }
    
    // Initializer Pusher and bind to channels/events for receiving messages
    // Parameter: playerUUID - the UUID of player that is used to set channel
    // Return: None
    private func initializePusher(playerUUID: String){
        options = PusherClientOptions(
            host: .cluster("us2")
        )
        
        pusher = Pusher(
            key: "d248640a905c26b2d657",
            options: options
        )
        
        // subscribe to channel and bind to event
        let channel = pusher.subscribe("p-channel-\(playerUUID)")
        
        let _ = channel.bind(eventName: "broadcast", callback: { (data: Any?) -> Void in
            if let data = data as? [String : AnyObject] {
                if let message = data["message"] as? String {
                    self.roomActivity.append(message)
                    self.getPlayerState()
                }
            }
        })
        
        let _ = channel.bind(eventName: "broadcast_message", callback: { (data: Any?) -> Void in
            if let data = data as? [String : AnyObject] {
                if let message = data["message"] as? String {
                    self.roomActivity.append(message)
                }
            }
        })
        
        pusher.connect()
    }
    
    //MARK: Networking Method
    
    
    // Makes init API call using URLSession to send URLRequest
    // Parameter: completion - passes game or error response from the server for use at completion
    // Return: None
    private func initAPI(completion: @escaping (Game?, Error?) ->Void ){
        guard let authToken = authToken else {
            NSLog("No authorization token")
            return
        }
        let url = baseURL.appendingPathComponent("init/")
        var request = URLRequest(url: url)
        request.setValue("Token \(authToken)", forHTTPHeaderField: "Authorization")
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                NSLog("Error: \(error)")
                return
            }
            guard let data = data else {
                NSLog("Error: Data is nil")
                return
            }
            do{
                let game = try JSONDecoder().decode(Game.self, from: data)
                completion(game,nil)
            } catch {
                completion(nil,error)
                NSLog("Error: \(error)")
            }
            }.resume()
        
    }
    
    // Makes move API call using URLSession to send URLRequest
    // Parameter: direction - direction that the user selected
    //            completion - passes game or error from the API response for use at completion
    // Return: None
    private func makeMoveAPI(direction:String, completion: @escaping (Game?, Error?) -> Void ){
        guard let authToken = authToken else {
            NSLog("No authorization token")
            return
        }
        let url = baseURL.appendingPathComponent("move/")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("Token \(authToken)", forHTTPHeaderField: "Authorization")
        request.setValue("Application/json", forHTTPHeaderField: "Content-Type")
        
        let move = ["direction":direction]
        let data = try! JSONEncoder().encode(move)
        request.httpBody = data
        
        URLSession.shared.dataTask(with: request) { (data, _, error) in
            if let error = error {
                NSLog("Error sending move request: \(error)")
                completion(nil,error)
            }
            if let data = data {
                do{
                    let game = try JSONDecoder().decode(Game.self, from: data)
                    completion(game, nil)
                } catch {
                    completion(nil,error)
                }
            }
            }.resume()
        
    }
    
    // Makes say API call using URLSession to send URLRequest
    // Parameter: message - message input by user
    //            completion - allows user to execute actions after completion of call
    // Return: None
    private func sendMessageAPI(message:String?, completion: @escaping () -> Void ){
        guard let authToken = authToken else {
            NSLog("No authorization token")
            return
        }
        let url = baseURL.appendingPathComponent("say/")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("Token \(authToken)", forHTTPHeaderField: "Authorization")
        request.setValue("Application/json", forHTTPHeaderField: "Content-Type")
        
        let say = ["message":message]
        let data = try! JSONEncoder().encode(say)
        request.httpBody = data
        
        URLSession.shared.dataTask(with: request) { (_, _, error) in
            if let error = error {
                NSLog("Error sending message: \(error)")
                return
            }
            completion()
            }.resume()
    }
    
    
    //MARK: - Properties
    
    @IBOutlet weak var roomNameTextLabel: UILabel!
    @IBOutlet weak var roomDescriptionTextView: UITextView!
    @IBOutlet weak var playerListTextView: UITextView!
    
    @IBOutlet weak var messageTextField: UITextField!
    @IBOutlet weak var activityTextView: UITextView!
    
    private var directions = ["n","e","s","w"]
    
    private var players = [String](){
        didSet{
            updatePlayers()
        }
    }
    
    private var roomActivity = [String](){
        didSet{
            updateChat()
        }
    }
    var playerName:String!
    var playerUUID:String?
    var authToken:String?
    var currentRoom: String?
    
    private var options: PusherClientOptions!
    private var pusher: Pusher!
    
}
