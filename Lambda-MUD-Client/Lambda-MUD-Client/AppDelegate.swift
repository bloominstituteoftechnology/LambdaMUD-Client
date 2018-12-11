//
//  AppDelegate.swift
//  Lambda-MUD-Client
//
//  Created by David Doswell on 12/10/18.
//  Copyright © 2018 David Doswell. All rights reserved.
//

import UIKit
import PusherSwift

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    var window: UIWindow?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        window = UIWindow(frame: UIScreen.main.bounds)
        
        let vc = HomeController()
        
        let navigationController = UINavigationController(rootViewController: vc)
        
        navigationController.navigationBar.prefersLargeTitles = true
        navigationController.navigationBar.barTintColor = .black
        navigationController.navigationBar.largeTitleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white]
        
        window?.rootViewController = navigationController
        
        window?.makeKeyAndVisible()
        
        let options = PusherClientOptions(host: .cluster("us2"))
        
        let pusher = Pusher(key: "0f3f86ad41df78e9448b", options: options)
        
        // subscribe to channel and bind to event
        let channel = pusher.subscribe("my-channel")
        
        let _ = channel.bind(eventName: "my-event", callback: { (data: Any?) -> Void in
            if let data = data as? [String : AnyObject] {
                if let message = data["message"] as? String {
                    print(message)
                }
            }
        })
        
        pusher.connect()
        
        return true
    }

}

