hero_sprite: Sprite = None




def create_hero_sprite():
    global hero_sprite
    hero_sprite = sprites.create(assets.image("""mc"""), SpriteKind.player)
    hero_sprite.set_position(80, 100)
    controller.move_sprite(hero_sprite)
    hero_sprite.set_stay_in_screen(True)



def fire_projectile():
    projectile = sprites.create_projectile_from_sprite(assets.image("""a"""), hero_sprite, 0, -100)


def spawn_food():
    falling_food = sprites.create(assets.image("""burger"""), SpriteKind.food)
    falling_food.set_position(randint(10, 150), 0)
    falling_food.set_velocity(0, 40)


def calculate_score_for_food_hit(food_sprite_hit: Sprite):
    vertical_distance = Math.abs(hero_sprite.y - food_sprite_hit.y)
    return Math.max(100 - vertical_distance, 0)


def on_projectile_hits_food(projectile_sprite: Sprite, food_target_sprite: Sprite):
    info.change_score_by(calculate_score_for_food_hit(food_target_sprite))
    projectile_sprite.destroy()
    food_target_sprite.destroy(effects.spray, 250)





def create_custom_sprite_grid(grid_rows: int, grid_columns: int, sprite_img, start_pos_x: int, start_pos_y: int, sprite_kind_value: number):
    for row_index in range(grid_rows):
        for col_index in range(grid_columns):
            new_sprite = sprites.create(sprite_img, sprite_kind_value)
            new_sprite.set_position(start_pos_x + col_index * 20, start_pos_y + row_index * 20)





controller.A.on_event(ControllerButtonEvent.PRESSED, fire_projectile)




sprites.on_overlap(SpriteKind.projectile, SpriteKind.food, on_projectile_hits_food)



create_hero_sprite()
create_custom_sprite_grid(3, 5, assets.image("""b"""), 30, 20, SpriteKind.enemy)
game.on_update_interval(2000, spawn_food)
