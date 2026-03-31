package connections

type LogStruct struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type ProfileStr struct {
	Name    string `json:"name"`
	Roll_no string `json:"roll"`
}

type ProfileFetch struct {
	Name    string `json:"name"`
	Roll_no string `json:"roll"`
	Email   string `json:"email"`
}
