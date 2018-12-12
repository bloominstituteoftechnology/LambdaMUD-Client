//
//  WelcomeViewController.swift
//  MUD-Project
//
//  Created by Andrew Dhan on 12/10/18.
//  Copyright © 2018 Andrew Liao. All rights reserved.
//

import UIKit

class WelcomeViewController: UIViewController {
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        let baseURL = URL(string: "https://dhan-mud.herokuapp.com/api/")!
        let url = baseURL.appendingPathComponent("login/")
        var request = URLRequest(url: url)
        request.setValue("Application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        let credentials = ["username":"testuser", "password":"testpassword"]


        do{

            let body = try JSONEncoder().encode(credentials)
            request.httpBody = body
            print(String(data: body, encoding: String.Encoding.utf8))
        } catch {
            print(error)
        }


        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                print (error)
            }
            print(String(data: data!, encoding: String.Encoding.utf8))

            var dictionary = [String:String]()
            do{
                dictionary = try JSONDecoder().decode([String:String].self, from: data!)

            } catch{
                NSLog("Error: \(error)")
            }
            print(response)
            //            print(dictionary)

            }.resume()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destinationVC = segue.destination as! CredentialsViewController
        if segue.identifier == "CreateAccount" {
            destinationVC.isNewPlayer = true
        }
    }
}
