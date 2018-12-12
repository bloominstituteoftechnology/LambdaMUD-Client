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
    //MARK: - Private Methods
    private func initializeGame(){
        guard let authToken = authToken else {
            NSLog("No authorization token")
            return
        }
        let url = baseURL.appendingPathComponent("init/")
        var request = URLRequest(url: url)
        request.setValue("Authorization", forHTTPHeaderField: "Token \(authToken)")
        URLSession.shared.dataTask(with: request) { (data, _, error) in
            if let error = error {
                NSLog("Error: \(error)")
                return
            }
            guard let data = data else {
                NSLog("Error: Data is nil")
                return
            }
            var dictionary = [String:String]()
            do{
                dictionary = try JSONDecoder().decode([String:String].self, from: data)
            } catch {
                NSLog("Error: \(error)")
            }
            print(dictionary)
        }.resume()
        
    }
    
    
    //MARK: - Properties
    var authToken:String?{
        didSet{
            initializeGame()
        }
    }
}
