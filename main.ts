let hero_sprite : Sprite = null
function create_hero_sprite() {
    
    hero_sprite = sprites.create(assets.image`mc`, SpriteKind.Player)
    hero_sprite.setPosition(80, 100)
    controller.moveSprite(hero_sprite)
    hero_sprite.setStayInScreen(true)
}

function create_projectile() {
    let projectile = sprites.createProjectileFromSprite(assets.image`a`, hero_sprite, 0, -100)
}

function create_enemy_grid(rows: number, columns: number) {
    let enemy: Sprite;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            enemy = sprites.create(assets.image`b`, SpriteKind.Enemy)
            enemy.setPosition(30 + col * 20, 20 + row * 20)
        }
    }
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_button_pressed() {
    create_projectile()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function handle_projectile_hits_food(projectile: Sprite, food: Sprite) {
    let distance = Math.abs(projectile.y - hero_sprite.y)
    info.changeScoreBy(100 - distance)
    projectile.destroy()
    food.destroy()
})
create_hero_sprite()
create_enemy_grid(3, 5)
game.onUpdateInterval(2000, function spawn_food() {
    let food = sprites.create(assets.image`burger`, SpriteKind.Food)
    food.setPosition(randint(10, 150), 0)
    food.setVelocity(0, 40)
})
