DELIMITER $$

CREATE TRIGGER ensure_category_not_empty
BEFORE INSERT ON Post
FOR EACH ROW
BEGIN
    -- Check if the category are empty or only consist of whitespace
    IF TRIM(NEW.category) = '' OR TRIM(NEW.category) IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Post must have at least one tag.';
    END IF;
    
    -- Optionally, check if the category only contain whitespace and not actual category
    -- You can split the string by commas and ensure there is at least one non-empty tag
    

    IF tag_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Post must have at least one valid tag.';
    END IF;
END $$

DELIMITER ;