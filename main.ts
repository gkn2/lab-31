let hero_sprite : Sprite = null
function create_hero_sprite() {
    
    hero_sprite = sprites.create(assets.image`mc`, SpriteKind.Player)
    hero_sprite.setPosition(80, 100)
    controller.moveSprite(hero_sprite)
    hero_sprite.setStayInScreen(true)
}

function calculate_score_for_food_hit(food_sprite_hit: Sprite): number {
    let vertical_distance = Math.abs(hero_sprite.y - food_sprite_hit.y)
    return Math.max(100 - vertical_distance, 0)
}

function create_custom_sprite_grid(grid_rows: number, grid_columns: number, sprite_img: any, start_pos_x: number, start_pos_y: number, sprite_kind_value: number) {
    let new_sprite: Sprite;
    for (let row_index = 0; row_index < grid_rows; row_index++) {
        for (let col_index = 0; col_index < grid_columns; col_index++) {
            new_sprite = sprites.create(sprite_img, sprite_kind_value)
            new_sprite.setPosition(start_pos_x + col_index * 20, start_pos_y + row_index * 20)
        }
    }
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function fire_projectile() {
    let projectile = sprites.createProjectileFromSprite(assets.image`a`, hero_sprite, 0, -100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function on_projectile_hits_food(projectile_sprite: Sprite, food_target_sprite: Sprite) {
    info.changeScoreBy(calculate_score_for_food_hit(food_target_sprite))
    projectile_sprite.destroy()
    food_target_sprite.destroy(effects.spray, 250)
})
create_hero_sprite()
create_custom_sprite_grid(3, 5, assets.image`b`, 30, 20, SpriteKind.Enemy)
game.onUpdateInterval(2000, function spawn_food() {
    let falling_food = sprites.create(assets.image`burger`, SpriteKind.Food)
    falling_food.setPosition(randint(10, 150), 0)
    falling_food.setVelocity(0, 40)
})
