//
//  NetworkController.swift
//  LambdaMUD
//
//  Created by Jonathan T. Miles on 12/11/18.
//  Copyright © 2018 Jonathan T. Miles. All rights reserved.
//

import Foundation

class NetworkController {
    
    // login method
    func login(username: String, password: String) {
        
        let url = baseURL.appendingPathComponent("login/")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        let dictionary: [String: String] = ["username": username, "password": password]
        let jsonEncoder = JSONEncoder()
        do {
            let data = try jsonEncoder.encode(dictionary)
            let printData = String(data: data, encoding: .utf8)
            print(printData)
            request.httpBody = data
        } catch {
            NSLog("Error encoding username and password into data")
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                NSLog("Error signing up to a new account:  \(error)")
            }
            
            if let data = data {
                do {
                    let printData = String(data: data, encoding: .utf8)
                    print(printData)
                    let dict = try JSONDecoder().decode([String: String].self, from: data)
                    self.key = dict["key"]!
                } catch {
                    NSLog("Error decoding data")
                }
            } else {
                NSLog("Error decoding data from signup fetch request")
            }
        }.resume()
        
        
    }
    
    // signup method
    func signup(username: String, password1: String, password2: String) {
        
        let url = baseURL.appendingPathComponent("registration/")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        let dictionary: [String: String] = ["username": username, "password1": password1, "password2": password2]
        let jsonEncoder = JSONEncoder()
        do {
            let data = try jsonEncoder.encode(dictionary)
            let printData = String(data: data, encoding: .utf8)
            print(printData)
            request.httpBody = data
        } catch {
            NSLog("Error encoding username and password into data: \(error)")
        }
        
        request.setValue("Application/json", forHTTPHeaderField: "Content-type")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                NSLog("Error signing up to a new account:  \(error)")
            }
            
            if let data = data {
                do {
                    let printData = String(data: data, encoding: .utf8)
                    print(printData)
                    let dict = try JSONDecoder().decode([String: String].self, from: data)
                    self.key = dict["key"]!
                } catch {
                    NSLog("Error decoding data: \(error)")
                }
            } else {
                NSLog("Error decoding data from signup fetch request: \(error)")
            }
        }.resume()
    }
    
    // initialize method
    
    // move method
    
    // say method
    
    // MARK: - Properties
    
    static var shared = NetworkController()
    
    private var key = ""
    
//    private let baseURL = URL(string: "localhost:8000/api/")!
    private let baseURL = URL(string: "https://adv-project-jtm.herokuapp.com/api/")!
}
