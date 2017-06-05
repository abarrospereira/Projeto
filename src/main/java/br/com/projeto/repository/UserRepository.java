package br.com.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.projeto.domain.User;

@Repository
public interface UserRepository  extends JpaRepository<User, String>{

	@Query("select u from User u inner join u.profiles where u.username = :id")
	User findByUserName(@Param("id") String id);
}
