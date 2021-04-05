package config

import (
    "github.com/ghodss/yaml"
    "github.com/spf13/afero"
)

func ReadConfig(fs afero.Fs, filename string) (Config, error) {
    b, err := afero.ReadFile(fs, filename)
    if err != nil {
        return Config{}, err
    }
    var conf Config
    if err := yaml.Unmarshal(b, &conf); err != nil {
        return Config{}, err
    }
    return conf, nil
}

type Config struct {
    Server    Server   `json:"server"`
    GCP       Gcp      `json:"gcp"`
    Merchants []string `json:"merchants"`
}

type Gcp struct {
    ProjectID     string `json:"projectid"`
    Storagebucket string `json:"storagebucket"`
    Location      string `yaml:"location" envconfig:"LOCATION"`
    ProductSetId  string `yaml:"productsetid" envconfig:"PRODUCTSETID"`
}

type Server struct {
    Port string `json:"port"`
}
