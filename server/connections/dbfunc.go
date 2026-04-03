package connections

import (
	"errors"
)

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
func SignUp(data LogStruct) error {
	if data.Email == "" || data.Password == "" {
		return errors.New("email and password cannot be empty")
	}

	exists, err := Checkexist(data.Email)
	if err != nil {
		return err
	}
	if exists {
		return errors.New("user already exists")
	}

	user := ProfileStr{
		Email:    data.Email,
		Password: data.Password,
	}

	if err := DB.Create(&user).Error; err != nil {
		return err
	}

	return nil
}

func FindAll() ([]ProfileFetch, error) {
	var users []ProfileFetch
	result := DB.Find(&users)
	if result.Error != nil {
		return nil, result.Error

	}
	return users, nil
}

func GetProfileByEmail(email string) (*ProfileStr, error) {
	var user ProfileStr
	result := DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}
