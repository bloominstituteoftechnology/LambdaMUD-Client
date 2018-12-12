//
//  RoomViewController.swift
//  LambdaMUD
//
//  Created by Jonathan T. Miles on 12/12/18.
//  Copyright © 2018 Jonathan T. Miles. All rights reserved.
//

import UIKit

class RoomViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        NetworkController.shared.initialize()
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
