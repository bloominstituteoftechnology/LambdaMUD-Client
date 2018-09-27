import store from '../../config/store'
import {SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT} from '../../config/constants'

export default function handleMovement(Player) {

    const getNewPosition = (oldPos, direction) => {
        switch(direction) {
            case 'WEST':
                return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
            case 'EAST':
                return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
            case 'NORTH':
                return [oldPos[0], oldPos[1] - SPRITE_SIZE]
            case 'SOUTH':
                return [oldPos[0], oldPos[1] + SPRITE_SIZE]
            default:
                console.log('GET NEW POSITION NOT GOT')
        } 
    }

    const getSpriteLocation = (direction, walkIndex) => {
        switch(direction) {
            case 'SOUTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
            case 'EAST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
            case 'WEST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
            case 'NORTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
            default:
                console.log('NORTHWEST...ERROR')
        }
    }

    const getWalkIndex = () => {
        const walkIndex = store.getState().character.walkIndex
        return walkIndex >= 7 ? 0: walkIndex + 1
    }

    const observerBoundaries = (oldPos, newPos) => {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
            (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    }

    const observerImpassable = (oldPos, newPos) => {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        return nextTile < 5
    }

    const dispatchMove = (direction, newPos) => {
        const walkIndex = getWalkIndex()
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                direction,
                walkIndex,
                spriteLocation: getSpriteLocation(direction, walkIndex)
            }
        })
    }

    const attemptMove = (direction) => {
        const oldPos = store.getState().character.position
        const newPos = getNewPosition(oldPos, direction)

        if (observerBoundaries(oldPos, newPos) && observerImpassable(oldPos, newPos)) dispatchMove(direction, newPos)
    }

    const handleKeyDown = (e) => {

        switch(e.keyCode) {
            case 37:
                console.log('HERE', store.getState().character.position)
                console.log('TOO', store.getState().play.player.title)
                console.log('TOO', store.getState().play.player.description)
                return attemptMove('WEST')
            case 38:
                console.log('HERE', store.getState().character.position)
                console.log('TOO', store.getState().play.player.title)
                console.log('TOO', store.getState().play.player.description)
                return attemptMove('NORTH')
            case 39:
                console.log('HERE', store.getState().character.position)
                console.log('TOO', store.getState().play.player.title)
                console.log('TOO', store.getState().play.player.description)
                return attemptMove('EAST')
            case 40:
                console.log('HERE', store.getState().character.position)
                console.log('TOO', store.getState().play.player.title)
                console.log('TOO', store.getState().play.player.description)
                return attemptMove('SOUTH')
            default:
                return
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return Player
} 