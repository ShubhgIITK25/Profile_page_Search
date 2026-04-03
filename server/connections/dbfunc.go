package connections

func Checkexist(email string) (bool, error) {
	var count int64

	err := DB.Model(&ProfileStr{}).
		Where("email = ?", email).
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func FindAll() ([]ProfileStr, error) {
	var users []ProfileStr
	result := DB.Find(&users)
	if result.Error != nil {
		return nil, result.Error

	}
	return users, nil
}
