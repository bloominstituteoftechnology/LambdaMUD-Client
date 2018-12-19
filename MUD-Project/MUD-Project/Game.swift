//
//  Game.swift
//  MUD-Project
//
//  Created by Andrew Dhan on 12/12/18.
//  Copyright © 2018 Andrew Liao. All rights reserved.
//

import Foundation

struct Game:Decodable{
    var uuid: String?
    var name: String
    var title: String
    var description: String
    var players: [String]
    var error_msg: String?
}
