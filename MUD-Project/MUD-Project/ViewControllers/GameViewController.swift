//
//  GameViewController.swift
//  MUD-Project
//
//  Created by Andrew Dhan on 12/10/18.
//  Copyright © 2018 Andrew Liao. All rights reserved.
//

import UIKit
private let baseURL = URL(string: "https://dhan-mud.herokuapp.com/api/adv/")!

class GameViewController: UIViewController {
    
    // MARK: - IBAction
    
    @IBAction func move(_ sender: UIButton) {
        let direction = directions[sender.tag]
        makeMoveAPI(direction: direction) { (game, error) in
            if let error = error {
                NSLog("Error making move: \(error)")
            }
            if let game = game{
                DispatchQueue.main.async {
                    guard let errorMessage = game.error_msg, !errorMessage.isEmpty else {
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
    
    //MARK: - Private Methods
    private func updateViews(game:Game){
        roomNameTextLabel.text = game.title
        roomDescriptionTextView.text = game.description
        if game.players.isEmpty{
            playerListTextView.text = "No one but your shadow"
        } else {
            playerListTextView.text = game.players.joined(separator: ", ")
        }
        
    }
    
    private func initializeGame(completion: @escaping (Game?, Error?) ->Void ){
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
            //            var dictionary = [String:Any?]()
            do{
                let game = try JSONDecoder().decode(Game.self, from: data)
                completion(game,nil)
                print(game)
            } catch {
                completion(nil,error)
                NSLog("Error: \(error)")
            }
            //            print(dictionary)
            }.resume()
        
    }
    
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
    
    //MARK: - Properties
    
    @IBOutlet weak var roomNameTextLabel: UILabel!
    @IBOutlet weak var roomDescriptionTextView: UITextView!
    @IBOutlet weak var playerListTextView: UITextView!
    private var directions = ["n","e","s","w"]
    
    var authToken:String?{
        didSet{
            initializeGame { (game, error) in
                if let error = error {
                    NSLog("Error fetching from server: \(error)")
                }
                
                if let game = game {
                    DispatchQueue.main.async {
                        self.updateViews(game: game)
                    }
                }
            }
            
        }
    }
    
    
}
