const validateBartenderProfile = (req, res, next) => {
    const {
        yearsOfExperience,
        specialties,
        hourlyRate,
        serviceLocation,
        availability,
        professionalBio
    } = req.body;

    const errors = [];

    // Validate Years of Experience
    if (!yearsOfExperience) {
        errors.push('Years of experience is required');
    }

    // Validate Specialties
    if (!specialties || !Array.isArray(specialties) || specialties.length === 0) {
        errors.push('At least one specialty must be selected');
    }

    // Validate Hourly Rate
    if (!hourlyRate || hourlyRate < 0) {
        errors.push('Valid hourly rate is required');
    }

    // Validate Service Location
    if (!serviceLocation || serviceLocation.trim().length < 2) {
        errors.push('Service location is required');
    }

    // Validate Availability
    if (!availability || !Array.isArray(availability) || availability.length === 0) {
        errors.push('At least one availability option must be selected');
    }

    // Validate Professional Bio
    if (!professionalBio || professionalBio.trim().length < 50) {
        errors.push('Professional bio must be at least 50 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = { validateBartenderProfile };
