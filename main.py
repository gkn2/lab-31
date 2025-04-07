hero_sprite: Sprite = None



def create_hero_sprite():
    global hero_sprite
    hero_sprite = sprites.create(assets.image("""mc"""), SpriteKind.player)
    hero_sprite.set_position(80, 100)
    controller.move_sprite(hero_sprite)
    hero_sprite.set_stay_in_screen(True)




def create_projectile():
    projectile = sprites.create_projectile_from_sprite(assets.image("""a"""), hero_sprite, 0, -100)



def spawn_food():
    food = sprites.create(assets.image("""burger"""), SpriteKind.food)
    food.set_position(randint(10, 150), 0)
    food.set_velocity(0, 40)




def handle_projectile_hits_food(projectile: Sprite, food: Sprite):
    distance = abs(projectile.y - hero_sprite.y)
    info.change_score_by(100 - distance)
    projectile.destroy()
    food.destroy()




def create_enemy_grid(rows: number, columns: number):
    for row in range(rows):
        for col in range(columns):
            enemy = sprites.create(assets.image("""b"""), SpriteKind.enemy)
            enemy.set_position(30 + col * 20, 20 + row * 20)





def on_a_button_pressed():
    create_projectile()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_button_pressed)



sprites.on_overlap(SpriteKind.projectile, SpriteKind.food, handle_projectile_hits_food)


create_hero_sprite()
create_enemy_grid(3, 5)
game.on_update_interval(2000, spawn_food)



