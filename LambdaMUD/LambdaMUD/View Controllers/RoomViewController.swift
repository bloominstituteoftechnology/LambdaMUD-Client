//
//  RoomViewController.swift
//  LambdaMUD
//
//  Created by Jonathan T. Miles on 12/12/18.
//  Copyright © 2018 Jonathan T. Miles. All rights reserved.
//

import UIKit

class RoomViewController: UIViewController {

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
//        NetworkController.shared.initialize()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        updateViews()

    }
    
    @IBAction func speak(_ sender: Any) {
    }
    
    // move
    @IBAction func moveNorth(_ sender: Any) {
        NetworkController.shared.move(direction: "n")
        updateViews()
    }
    @IBAction func moveEast(_ sender: Any) {
        NetworkController.shared.move(direction: "e")
        updateViews()
    }
    @IBAction func moveSouth(_ sender: Any) {
        NetworkController.shared.move(direction: "s")
        updateViews()
    }
    @IBAction func moveWest(_ sender: Any) {
        NetworkController.shared.move(direction: "w")
        updateViews()
    }
    
    // MARK: - Private
    
    private func updateViews() {
        DispatchQueue.main.async {
            if let room: Room = NetworkController.shared.rooms.last {
                self.title = room.title
                self.roomDescription.text = room.description
            }
        }
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    @IBOutlet weak var roomDescription: UITextView!
    @IBOutlet weak var sayTextField: UITextField!
    
}
