package com.devsuperior.movieflix.services.validation;

import com.devsuperior.movieflix.controllers.exceptions.FieldMessage;
import com.devsuperior.movieflix.dto.ReviewDto;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ReviewInsertValidator implements ConstraintValidator<ReviewInsertValid, ReviewDto> {

    @Autowired
    private ReviewRepository repository;

    @Override
    public void initialize(ReviewInsertValid ann) {
    }

    @Override
    public boolean isValid(ReviewDto dto, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();

        Optional<Review> review = repository.findById(dto.getId());
        if (review != null){
            list.add(new FieldMessage("text","Invalid text"));
        }

        //insere na list de erros do Beans Validation a nossa lista de erros
        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }
        return list.isEmpty();
    }
}
