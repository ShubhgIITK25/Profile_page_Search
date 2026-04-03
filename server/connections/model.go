package connections

type LogStruct struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type ProfileStr struct {
	Email    string `json:"email" gorm:"uniqueIndex;not null"`
	Password string `json:"password" gorm:"not null"`
}

func (ProfileStr) TableName() string {
	return "users"
}

type ProfileFetch struct {
	Password string `json:"password"`
	Name     string `json:"name"`
	Roll_no  string `json:"roll"`
	Email    string `json:"email"`
}
