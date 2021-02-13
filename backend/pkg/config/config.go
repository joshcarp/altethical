package config

import (
	"github.com/ghodss/yaml"
	"github.com/spf13/afero"
)

func ReadConfig(fs afero.Fs, filename string) (Config, error) {
	b, err := afero.ReadFile(fs, filename)
	if err != nil {
		return Config{}, nil
	}
	var conf Config
	if err := yaml.Unmarshal(b, &conf); err != nil {
		return Config{}, err
	}
	return conf, nil
}

type Config struct {
	Database struct {
		Type     string `yaml:"type"`
		Schema   string `yaml:"schema"`
		Host     string `yaml:"host"`
		Dbname   string `yaml:"dbname"`
		Port     string `yaml:"port"`
		User     string `yaml:"user"`
		Password string `yaml:"password"`
	} `yaml:"database"`
	Server struct {
		Port string `yaml:"port"`
	} `yaml:"server"`
	GCP struct {
		ProjectID     string `yaml:"projectid"`
		ProjectNum    string `yaml:"projectnum"`
		SecretName    string `yaml:"secretname"`
		Databaseurl   string `yaml:"databaseurl"`
		Storagebucket string `yaml:"storagebucket"`
	} `yaml:"gcp"`
}
