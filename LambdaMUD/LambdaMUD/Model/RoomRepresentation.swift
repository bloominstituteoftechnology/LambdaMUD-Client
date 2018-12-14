//
//  RoomRepresentation.swift
//  LambdaMUD
//
//  Created by Jonathan T. Miles on 12/13/18.
//  Copyright © 2018 Jonathan T. Miles. All rights reserved.
//

import Foundation

struct Room: Codable {
    let uuid: String?
    let name: String
    let title: String
    let description: String
    let players: [String]
    let error_msg: String?
}
