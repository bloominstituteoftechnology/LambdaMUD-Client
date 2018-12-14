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
        
        updateRoom()

    }
    
    @IBAction func speak(_ sender: Any) {
        updateViews()
    }
    
    // move
    @IBAction func moveNorth(_ sender: Any) {
        NetworkController.shared.move(direction: "n")
        updateRoom()
    }
    @IBAction func moveEast(_ sender: Any) {
        NetworkController.shared.move(direction: "e")
        updateRoom()
    }
    @IBAction func moveSouth(_ sender: Any) {
        NetworkController.shared.move(direction: "s")
        updateRoom()
    }
    @IBAction func moveWest(_ sender: Any) {
        NetworkController.shared.move(direction: "w")
        updateRoom()
    }
    
    // MARK: - Private
    
    private func updateRoom() {
//        DispatchQueue.main.async {
            if let room: Room = NetworkController.shared.rooms.last {
                self.room = room
            }
//        }
    }
    
    private func updateViews() {
        DispatchQueue.main.async {
            if let room = self.room {
                self.title = room.title
                self.roomDescription.text = room.description
            }
        }
    }
    
    private var room: Room? {
        didSet {
            updateViews()
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
