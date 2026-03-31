package connections

func Checkexist(email string) (bool, error) {
	var exists bool

	query := `SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)`
	err := DB.QueryRow(query, email).Scan(&exists)

	if err != nil {
		return false, err
	}

	return exists, nil
}
