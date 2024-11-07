DELIMITER $$

CREATE TRIGGER delete_posts_after_user_deletion
AFTER DELETE ON User
FOR EACH ROW
BEGIN
    DELETE FROM Post WHERE email = OLD.email;
END$$

DELIMITER ;
