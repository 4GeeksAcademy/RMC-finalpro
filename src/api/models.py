from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from datetime import date

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    first_last_name = db.Column(db.String(80), unique=False, nullable=False)
    second_last_name = db.Column(db.String(80), unique=False, nullable=False)
    nationality = db.Column(db.String(80), unique=False, nullable=True)
    gender = db.Column(db.String(15), unique=False, nullable=False)
    birthdate = db.Column(db.String(80), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    phone_number = db.Column(db.String(80), unique=False, nullable=False)
    facebook = db.Column(db.String(80), unique=False, nullable=True)
    instagram = db.Column(db.String(80), unique=False, nullable=True)
    x = db.Column(db.String(80), unique=False, nullable=True)
    blood_type = db.Column(db.String(5), unique=False, nullable=True)
    allergy = db.Column(db.String(80), unique=False, nullable=True)
    disease = db.Column(db.String(80), unique=False, nullable=True)
    city = db.Column(db.String(80), unique=False, nullable=False)
    address = db.Column(db.String(80), unique=False, nullable=False)
    home_country = db.Column(db.String(80), unique=False, nullable=False)
    country_of_residence = db.Column(db.String(80), unique=False, nullable=False)
    country_of_destination = db.Column(db.String(80), unique=False, nullable=False)
    state = db.Column(db.String(80), unique=False, nullable=False)
    zip_code = db.Column(db.String(80), unique=False, nullable=False)
    latitude = db.Column(db.String(80), nullable=True)
    longitude = db.Column(db.String(80), nullable=True)
    administrator_id = db.Column(db.Integer, db.ForeignKey('administrator.id'), nullable=True)
    reset_code = db.Column(db.String(4), nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "first_last_name": self.first_last_name,
            "second_last_name": self.second_last_name,
            "nationality": self.nationality,
            "gender": self.gender,
            "birthdate": self.birthdate,
            "email": self.email,
            "phone_number": self.phone_number,
            "facebook": self.facebook,
            "instagram": self.instagram,
            "x": self.x,
            "blood_type": self.blood_type,
            "allergy": self.allergy,
            "disease": self.disease,
            "city": self.city,
            "address": self.address,
            "home_country": self.home_country,
            "country_of_residence": self.country_of_residence,
            "country_of_destination": self.country_of_destination,
            "state": self.state,
            "zip_code": self.zip_code,
            # do not serialize the password, its a security breach
        }


class Administrator(db.Model):
    __tablename__ = 'administrator'
    id = db.Column(db.Integer, primary_key=True)
    organization_name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    user = db.relationship('User', backref='administrator', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "organization_name": self.organization_name,
            "email": self.email,
        }

class Contact(db.Model):
    __tablename__ = 'contact'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), unique=False, nullable=False)
    email = db.Column(db.String(150), unique=False, nullable=False)
    role = db.Column(db.String(250), nullable=False)
    phone_number = db.Column(db.String(80), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "role": self.role,
            "phone_number": self.phone_number,
            "user_id": self.user_id
        }

          